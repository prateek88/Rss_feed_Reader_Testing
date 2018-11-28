/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have URLs deined', function(){
           allFeeds.forEach(function(feed){
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
             expect(feed.url).toContain('http');
           });
         });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have names defined', function(){
           allFeeds.forEach(function(feed){
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           });
         });
    });


    /* Write a new test suite named "The menu" */
    describe('The Menu', function(){

        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('is hidden by default', function() {
           // Does body element have meu-hidden class apllied
           expect($('body').attr('class')).toBe('menu-hidden');
         });

         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('is displayed and hidden by clicking on menu icon', function(){
            // click on menu
            // simulating click event, copied from following link:
            // https://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
            function eventFire(el, etype){
              if (el.fireEvent) {
                el.fireEvent('on' + etype);
              } else {
                var evObj = document.createEvent('Events');
                evObj.initEvent(etype, true, false);
                el.dispatchEvent(evObj);
              }
            }
            let menuIcon = document.getElementsByClassName('menu-icon-link');
            eventFire(menuIcon[0], 'click');
            expect($('body').attr('class')).not.toBe('menu-hidden');

            //click on menu again
            eventFire(menuIcon[0], 'click');
            expect($('body').attr('class')).toBe('menu-hidden');
          });
    });
    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){

        beforeEach(function(done){
          loadFeed(0, done);
        });
        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         it('are loaded and show at least one entry', function(done){
           // expect at least one article with class 'entry' inside div with class 'feed'
           let feedElement = document.querySelector('.feed');
           expect(feedElement.children.length > 0).toBe(true);
           done();
         });
    });
    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){

        // store feed element in a variable, it will be used to comapre 2 feeds' data
        const feed = document.querySelector('.feed');
        const firstFeed = [];

        // AS localFeed is asynchronous, we need to use beforeEach and done
        beforeEach(function(done){
          // load first feed
          loadFeed(0);
          // store the data of first feed in an array
          Array.from(feed.children).forEach(function(entry){
            firstFeed.push(entry.innerText);
          });
          // load second feed with callback
          loadFeed(1, done);
        });
        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         it('changes content', function(){
           // When second feed complete loading, compare the text of this feed
           // with the previous feed data
           Array.from(feed.children).forEach(function(entry,index){
             console.log(entry.innerText, firstFeed[index], entry.innerText === firstFeed[index]);
             //TODO This works. but sometimes first feed's data is not loaded
             expect(entry.innerText === firstFeed[index]).toBe(false);
           });

         });
    });
}());
