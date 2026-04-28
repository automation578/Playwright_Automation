class InputboxPage {
     /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.url = 'https://demoqa.com/automation-practice-form';
    }

    /**
     * @param {string} firstName
     */
    async fillFirstName(firstName) {
        await this.page.fill("//input[@id='firstName']", firstName);
    }
}
module.exports = { InputboxPage };