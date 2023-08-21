import {GeometryType, IFigureItem} from '../../src/app/figure-item.model';

function generateRandomHexColor(): string {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const redHex = red.toString(16).padStart(2, '0');
  const greenHex = green.toString(16).padStart(2, '0');
  const blueHex = blue.toString(16).padStart(2, '0');

  return `#${redHex}${greenHex}${blueHex}`;
}

describe('ng-shaper app', () => {
  let testFigure: IFigureItem;

  beforeEach(() => {
    cy.fixture<IFigureItem>('testFigure').then(figureData => testFigure = {...figureData, id: 'test-id-0'});
    cy.log('testFigure', testFigure);
    cy.visit('/');
  });

  it('should open the application and check for hero text and description', () => {
    cy.get('h1').contains('ng-shaper');
    cy.contains('Make your own 3D space with different figures');
  });

  it('should create a figure and display it in the list and canvas', () => {
    cy.get('#figure-name').type(testFigure.name);
    cy.get('#geometry-type').select(testFigure.geometryType);
    cy.get('#figure-size').invoke('val', testFigure.size).trigger('input');
    cy.get('#figure-color').invoke('val', testFigure.color).trigger('input');;
    cy.get('button[type="submit"]').click();

    cy.get('app-figure-list').should('contain', testFigure.name);
  });

  it('should delete figure from the list', () => {
    cy.get('app-figure-list').contains(testFigure.name).parent().parent().find('.delete-button').click();
    cy.get('app-figure-list').should('not.contain', testFigure.name);
  });

  it('should delete all figures', () => {
    cy.get('app-figure-list-item .delete-button').each((deleteButton) => {
      cy.wrap(deleteButton).click();
    });

    cy.get('app-figure-list-item').should('not.exist');
  });

  it('should create 100 new figures', () => {
    for (let i = 1; i <= 100; i++) {
      cy.get('#figure-name').clear().type(`Figure ${i}`);
      cy.get('#geometry-type').select(GeometryType.BOX);
      cy.get('#figure-size').invoke('val', 1).trigger('input');
      cy.get('#figure-color').invoke('val', generateRandomHexColor()).trigger('input');
      cy.get('button[type="submit"]').click();

      cy.get('app-figure-list').should('contain', `Figure ${i}`);
    }

    cy.get('app-figure-list-item').should('have.length', 100);
  });

  it('should not create a new figure if name field is empty', () => {
    cy.get('#figure-name').clear();
    cy.get('#geometry-type').select(GeometryType.CYLINDER);
    cy.get('#figure-size').invoke('val', 10).trigger('input');
    cy.get('button[type="submit"]').click();

    cy.get('app-figure-list-item:last-child()').should('not.be.empty');
    cy.get('app-figure-list-item:last-child() .geometry-details').should('not.contain', '10');
  });
});
