class InputboxPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://demoqa.com/automation-practice-form';
    }

    async fillFirstName(firstName) {
        await this.page.fill("//input[@id='firstName']", firstName);
    }
}
module.exports = { InputboxPage };