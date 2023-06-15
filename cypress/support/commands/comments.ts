export const addComment = (text: string) => {
    cy.getByTestId('ArticleDetailsCommentInput').type(text);
    cy.getByTestId('ArticleDetailsCommentSend').click();
};

declare global {
    namespace Cypress {
        interface Chainable {
            addComment(text: string): Chainable<void>;
        }
    }
}
