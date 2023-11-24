const baseURL = 'https://api-free.deepl.com/v2/translate';
const apiKey = 'e0fcdff4-5537-2591-46f0-7339c88aa996:fx';

const translateText = async (req, res, next) => {
    // console.log('hi');
    const {text, target_lang} = req.body;
        try {
            const response = await fetch(baseURL, {
                            body: JSON.stringify( {
                                text,
                                target_lang,                
                            }),
                            method: "POST",
                            headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `DeepL-Auth-Key ${apiKey}`, 
                                }, 
                        });
            const data = await response.json()
            console.log(data)
                return res.status(200).json(data)
              } catch (error) {
                    console.error('Error translating text:', error);
                    throw error;
              }
            };

export { translateText };