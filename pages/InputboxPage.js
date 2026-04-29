class InputboxPage {
     /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.url = 'https://demoqa.com/automation-practice-form';
        this.firstNameInput = page.locator("//input[@id='firstName']");
    }

    async navigate() {
        await this.page.goto(this.url);
    }

    /**
     * @param {string} firstName
     */
    async fillFirstName(firstName) {
        await this.firstNameInput.fill(firstName);
    }
}
module.exports = { InputboxPage };