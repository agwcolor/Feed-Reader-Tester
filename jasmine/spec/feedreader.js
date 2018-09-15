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
        it('allFeeds is defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('url defined', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);

            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('name defined', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);

            }
        });

    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('is hidden', function() {
            let isHidden = document.body.classList.contains('menu-hidden');
            expect(isHidden).toBe(true);

        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it('show/hide menu, when clicked ', function() {
            let body = document.getElementsByTagName('body')[0];
            let menuLink = document.querySelector('.menu-icon-link');

            menuLink.click();
            //console.log(body.classList.contains('menu-hidden') + " #2");
            //debugger;  used to see the clicks in action
            expect(body.classList.contains('menu-hidden')).toBe(false);

            menuLink.click();
            //console.log(body.classList.contains('menu-hidden') + " #3");
            //debugger;  used to see the clicks in action
            expect(body.classList.contains('menu-hidden')).toBe(true);


        });


        /* it('show/hide menu, when clicked ', function() {
                 $('a.menu-icon-link').trigger('click'); // show menu
                 expect($('body').hasClass('menu-hidden')).toBe(false);
                 $('a.menu-icon-link').trigger('click'); // hide menu again
                 expect($('body').hasClass('menu-hidden')).toBe(true);
        }); */

    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
            loadFeed(0, done);
            //console.log(allFeeds[0].name + " is the value of allFeeds name");
         })
        it('at least single entry in .feed container ', function() {
            const feed = document.querySelector('.feed');
            //console.log(feed + " is the value of feed div element");
            expect(feed.children.length).toBeGreaterThan(0);
            console.log(feed.children.length + " is the value of feed.children.length");

        });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        //const feed = document.querySelector('.feed').children;
        //const feed=(document.querySelector(".feed").children);

        const feed = document.querySelector('.feed');
        const firstFeed = [];

        beforeEach(function(done) {
            loadFeed(0);
            //console.log(feed.children.length + " inside before each feed.children");
            //console.log(feed.children[0]); + " is the value in the feed.children collection[0]";
            Array.from(feed.children).forEach(function(entry,index) {
                firstFeed.push(entry.innerText);
                console.log(firstFeed[0] + "is the value of frstFeed[index]");
            });

            loadFeed(1,done);
        });

        it('content changed when new feed loaded', function() {
        Array.from(feed.children).forEach(function(entry,index) {
        expect(entry.innnerText === firstFeed[index]).toBe(false);
        console.log(firstFeed[index] + "is the value of firstFeed[" + index + "]");
        //console.log(entry.innerText + " is the value of entry.innerText");
        //console.log(firstFeed[index] + " is the firstFeed[index]");
        console.log(entry.innerText === firstFeed[index]); //
            });
        });

    });
}());
