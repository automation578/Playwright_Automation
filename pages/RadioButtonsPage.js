class RadioButtonsPage {
    /**
     * @param {{ locator: (arg0: string) => any; }} page
     */
    constructor(page) {
        this.page = page;
        this.url = 'https://demoqa.com/automation-practice-form';
        this.maleRadioButton = page.locator("//input[@value='Male']");
        this.femaleRadioButton = page.locator("//input[@value='Female']");
    }
    maleRadioButtonCheck() {
        return this.maleRadioButton.check();
    }
    isMaleRadioButtonChecked() {
        return this.maleRadioButton.isChecked();
    }
    isFemaleRadioButtonChecked() {
        return this.femaleRadioButton.isChecked();
    }
    async navigate() {
        // @ts-ignore
        await this.page.goto(this.url);
    }
}
module.exports = { RadioButtonsPage };