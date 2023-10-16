import vocabularyJson from './vocabulary.json';

export async function processVocabulary(event, context, callback) {
  const decodedBody = Buffer.from(event.body, 'base64').toString('UTF-8');
  const params = new URLSearchParams(decodeURI(decodedBody));
  const inputText = params.get('inputText') || '';

  /* 
    My idea is - an existing JSON file is human-readable, however it would be better to
    inverse it for better machine processing and lower algorythm complexity to avoid nested loops
  */
  const inversedVocab = {};
  const result = {};

  Object.keys(vocabularyJson).map(key => {
    result[key] = 0;
    let category = vocabularyJson[key];

    category.forEach(word => inversedVocab[word] = key);
  })

  // Convert the input string into array and filter into new object to the expected shape
  inputText.split(' ').map(word => inversedVocab[word] && (result[inversedVocab[word]] = (result[inversedVocab[word]] || 0) + 1));

  callback(null, {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": '*',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(result)
  })
}
