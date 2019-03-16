var webdriver = require('selenium-webdriver'),
		test      = require('selenium-webdriver/testing'),
		assert    = require('assert');


var driver = new webdriver.Builder()
	.withCapabilities(webdriver.Capabilities.phantomjs())
	.build();

var e2eroot = 'http://localhost:9001/e2e';


test.describe('e2e tests', function() {

	test.it('Open Browser', function() {

		this.timeout(5000);

		driver.get(e2eroot);

		driver.wait(function() {
			return driver.getTitle().then(function(title) {
				return title === 'jquery.alphanum e2e tests';
			});
		}, 5000);

	});

	test.it('input[text]', function() {

		driver.get(e2eroot);

		var textbox = driver.findElement(webdriver.By.id('textbox'));
		textbox.sendKeys('lorem.ipsum');
		textbox.getAttribute('value').then(function(value) {
			assert.equal(value, 'loremipsum');
		});

	});

	test.it('textarea', function() {

		driver.get(e2eroot + '/textarea.html');

		var textbox = driver.findElement(webdriver.By.id('textareabox'));
		textbox.sendKeys('foo#bar');
		textbox.getAttribute('value').then(function(value) {
			assert.equal(value, 'foobar');
		});

	});

	test.it('newline', function() {

		driver.get(e2eroot + '/newline.html');

		var textbox = driver.findElement(webdriver.By.id('allowNewline'));
		textbox.sendKeys('foo\nbar');
		textbox.getAttribute('value').then(function(value) {
			assert.equal(value, 'foo\nbar');
		});

		textbox = driver.findElement(webdriver.By.id('disallowNewline'));
		textbox.sendKeys('foo\nbar');
		textbox.getAttribute('value').then(function(value) {
			assert.equal(value, 'foobar');
		});

	});

	test.it('rebind', function() {

		driver.get(e2eroot + '/rebind.html');

		var textbox = driver.findElement(webdriver.By.id('textbox'));
		textbox.sendKeys('abcdefg');
		textbox.getAttribute('value').then(function(value) {
			assert.equal(value, 'aefg');
		});

	});

	test.it('unbind', function() {

		driver.get(e2eroot + '/unbind.html');

		var textbox = driver.findElement(webdriver.By.id('textbox'));
		textbox.sendKeys('abcdefg');
		textbox.getAttribute('value').then(function(value) {
			assert.equal(value, 'abcdefg');
		});

	});

	test.it('copy-paste simple', function() {

		driver.get(e2eroot + '/copy-paste.html');

		var from = driver.findElement(webdriver.By.id('from'));
		from.sendKeys('a123b');
		from.sendKeys(webdriver.Key.CONTROL, "a");
		from.sendKeys(webdriver.Key.CONTROL, "c");

		var to = driver.findElement(webdriver.By.id('to'));
		to.sendKeys(webdriver.Key.CONTROL, "v");


		to.getAttribute('value').then(function(value) {
			assert.equal(value, 'ab');
		});

	});

	test.it('copy-paste mid string', function() {

		driver.get(e2eroot + '/copy-paste.html');

		var from = driver.findElement(webdriver.By.id('from'));
		from.sendKeys('a123b');
		from.sendKeys(webdriver.Key.CONTROL, "a");
		from.sendKeys(webdriver.Key.CONTROL, "c");

		var to = driver.findElement(webdriver.By.id('to'));
		to.sendKeys('xy')
		to.sendKeys(webdriver.Key.ARROW_LEFT);
		to.sendKeys(webdriver.Key.CONTROL, "v");


		to.getAttribute('value').then(function(value) {
			assert.equal(value, 'xaby');
		});

	});

	test.after(function() {
		driver.quit();
	})
});
