import { HackathonFrontPage } from './app.po';

describe('hackathon-front App', function() {
  let page: HackathonFrontPage;

  beforeEach(() => {
    page = new HackathonFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
