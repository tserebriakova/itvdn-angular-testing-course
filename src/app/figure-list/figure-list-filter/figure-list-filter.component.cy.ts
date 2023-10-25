import { ReactiveFormsModule } from '@angular/forms';
import { FigureListFilterComponent } from './figure-list-filter.component'

describe('FigureListFilterComponent', () => {
  beforeEach(() => {
    cy.mount(FigureListFilterComponent, {
      imports: [ReactiveFormsModule],
      componentProperties: {onFilterApplyHandler: cy.spy().as('onFilterApplyHandlerSpy')}
    });
  });

  it('should have all necessary elements for init state', () => {
    cy.get('input[type="text"]')
      .should('be.visible')
      .and('be.enabled')
      .and('have.attr', 'placeholder', 'Search figures...');

    cy.get('#advanced-options-btn')
      .should('be.visible')
      .and('be.enabled')
      .and('contain', '⌥');

    cy.get('#advanced-options-menu').should('not.exist');
  });

  it('should display advanced filter options after btn click', () => {
    cy.get('#advanced-options-btn').click();

    cy.get('#advanced-options-menu')
      .should('be.visible')
      .and('contain', 'Advanced Filter Options');

    cy.get('#geometry-type-selector').should('be.visible');
    cy.get('#size-range-selector-min').should('be.visible');
    cy.get('#size-range-selector-max').should('be.visible');
  });

  it('should correctly pass the filter data to the Output', () => {
    const testOutputData = {
      searchName: 'Test Figure',
      searchGeometryType: 'SphereGeometry',
      size: {
        from: 4,
        to: 9,
      }
    };

    cy.get('input[type="text"]').type('Test Figure');
    cy.get('#advanced-options-btn').click();
    cy.get('#geometry-type-selector').select(1);
    cy.get('#size-range-selector-min').invoke('val', 4).trigger('input');
    cy.get('#size-range-selector-max').invoke('val', 9).trigger('input');

    cy.get('@onFilterApplyHandlerSpy').should('have.been.calledOnceWith', testOutputData);
  });
});
