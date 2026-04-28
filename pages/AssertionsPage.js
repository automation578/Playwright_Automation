class AssertionsPage{
    constructor(page) {
        this.page = page
         this.url ='https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
    }
    async navigate() {
    await this.page.goto(this.url);
  }

  async getTitle() {
    return await this.page.title();
  }
}
module.exports = {AssertionsPage};