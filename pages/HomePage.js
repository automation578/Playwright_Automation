class HomePage {
  constructor(page) {
    this.page = page;
    this.url = 'https://demoqa.com/books';
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async getTitle() {
    return await this.page.title();
  }
}

module.exports = { HomePage };