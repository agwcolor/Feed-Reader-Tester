/* feedreader.js
 *
 * Spec file that Jasmine will read. Contains
 * tests that will be run against the feed reader application.
 */

/* Tests are contained w/in the $() function :
 * $(function(){...}()); is jQuery shorthand for a function that is only
 * called once all of the page DOM elements are ready to be manipulated.
 */

$(function() {
    /* This 'RSS Feeds suite performs tests on the allFeeds variable
     * which contains the names and URLs to all of the available feeds
     * as defined in app.js. () allFeeds is an array of objects containing 2 attributes,
     * name: and url: .
     */

    describe('RSS Feeds', function() {
        /* Checks  1. whether the allFeeds object variable has been defined
         *         2. that allFeeds is not empty.
         */
        it('allFeeds is defined', function() {
            expect(allFeeds).toBeDefined(); // has been defined
            expect(allFeeds.length).not.toBe(0); // allFeeds object not empty
        });


        /* The 'url defined' test
         * Checks 1. that each feed object in allFeeds has a url: attribute defined
         *        2. that each feed object url: attribute is not empty.
         */

        it('url defined', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined(); // url is defined
                expect(feed.url.length).not.toBe(0); // url is not empty
            }
        });


        /* The 'name defined' test
         * Checks 1. that each feed object in allFeeds has a name: attribute defined
         *        2. that each feed object name: attribute is not empty.
         */

        it('name defined', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined(); // name defined
                expect(feed.name.length).not.toBe(0); //name not empty
            }
        });
    });

    /*
     * "The menu" Test Suite : Verifies that the menu opens and closes correctly
     */

    describe('The menu', function() {

        /* 'is hidden' test
         * Checks that the sidebar menu is hidden by default.
         * In index.html, the <body> tag should have class="menu-hidden"
         * i.e. positioned off the page( -12em) in .style.css.
         */
        it('is hidden', function() {
            let isHidden = document.body.classList.contains('menu-hidden');
            expect(isHidden).toBe(true);

        });

        /* 'show/hide menu, when clicked' test :
         * Checks 1. that the sidebar menu appears when the
         *           hamburger menu is clicked. Checks for
         *        2. that the menu is hidden when clicked again.
         */

        it('show/hide menu, when clicked', function() {
            let body = document.getElementsByTagName('body')[0];
            let menuLink = document.querySelector('.menu-icon-link');

            menuLink.click(); //open sidebar
            expect(body.classList.contains('menu-hidden')).toBe(false); //sidebar menu should be showing

            menuLink.click(); //close sidebar menu on second click
            expect(body.classList.contains('menu-hidden')).toBe(true); //side bar menu should be hidden

        });

    });


    /* "Initial Entries" test suite - Verifies that a feed has been loaded with at least 1 entry */

    describe('Initial Entries', function() {

        /* 'at least 1 element in .feed' test:
         *        1. calls loadFeed function (uses beforeEach & done() to
         *           ensure it completes before running test.
         * Checks 2. make sure that there is at least one article (.entry) in the feed
         *
         */
        beforeEach(function(done) { // run loadFeed() and verifies is 'done' before running test
            loadFeed(0, done);
        });

        it('at least 1 element w/ class .entry in .feed', function() {

            let feed = document.querySelectorAll('.feed .entry');
            /* for (var i = feed.length - 1; i >= 0; i--) {
                console.log(feed[i]);
            }; //for debugging only to see value of feed */
            expect(feed.length).toBeGreaterThan(0); //make sure length of Nodelist object is greater than 0
        });
    });


    /* "New Feed Selection" Test Suite - When a new feed is loaded, make sure that headings and contents have changed */
    describe('New Feed Selection', function() {

        /*'feed and feed content changed when new feed loaded' test :
         *        1. calls loadFeed function 2x to simulate loading more than 1 feed.
         *           It uses beforeEach & done() to make sure it completes before running the test on the feed content.
         *           We store the header-title and first article (.entry) for each loadFeed function call so we can compare them later.
         * Checks 2. that the feed headings and feed content change
         */

        let firstFeed = ''; //declaring global variables for use in beforeEach & it() functions
        let firstFeedArticle = '';
        let secondFeed = '';
        let secondFeedArticle = '';

        beforeEach(function(done) {
            loadFeed(0, function() { //load first feed
                firstFeed = document.querySelector('.header-title').innerHTML; //get first feed title
                firstFeedArticle = document.querySelector('.entry').innerHTML; //get first article (.entry) of first feed title
                loadFeed(1, function() { //load second feed
                    secondFeed = document.querySelector('.header-title').innerHTML; //get second feed title
                    secondFeedArticle = document.querySelector('.entry').innerHTML; //get first article (.entry) of second feed title
                    done();
                });
            });
        });


        it('feed & feed content changed when new feed loaded', function() {
            expect(firstFeed).not.toBe(secondFeed); //makes sure feeds have changed by comparing their headings
            expect(firstFeedArticle).not.toBe(secondFeedArticle); //makes sure first articles of feeds have changed
        });
    });

}());