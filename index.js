var APP_ID = 'Stxiv4jWJdPP2bByxcLkNxsu-gzGzoHsz';
var APP_KEY = 'Fjo8y5LLPq2vBtPpPmvC7o8g';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});


var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  console.log('LeanCloud Rocks!');
})
