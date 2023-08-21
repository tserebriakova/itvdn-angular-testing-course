import { IFigureItem } from "src/app/figure-item.model";
import { FigureListItemComponent } from "./figure-list-item.component";

describe('FigureListItemComponent', () => {
  let testFigure: IFigureItem;

  beforeEach(() => {
    cy.fixture<IFigureItem>('testFigure').then(figureData => testFigure = { ...figureData, id: 'test-id-0' });
  });

  it('can mount', () => {
    cy.mount(FigureListItemComponent, {
      componentProperties: { item: testFigure },
    });

    cy.get('[data-cy="figure-name"]').should('have.text', testFigure.name);
    cy.get('.color-preview').should('have.css', { backgroundColor: testFigure.color });
    cy.get('.geometry-details').should('have.text', `| ${testFigure.geometryType} | ${testFigure.size}`);
  });

  it('should emit value via onRemoveEmitter', () => {
    cy.mount(FigureListItemComponent, {
      componentProperties: { item: testFigure, onRemoveEmitter: cy.spy().as('onRemoveEmitterSpy') },
    });

    cy.get('.delete-button').click();
    cy.get('@onRemoveEmitterSpy').should('have.been.calledOnceWith', testFigure.id);
  });

  it('should mount component by its template', () => {
    cy.mount(`
      <app-figure-list-item
        [item]="{name: 'Inline Testing Figure 1', geometryType: 'BoxGeometry', color: '#0000ff', size: 7}">
      </app-figure-list-item>`,
      { declarations: [FigureListItemComponent] },
    )
  });
});
