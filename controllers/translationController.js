const baseURL = 'https://api-free.deepl.com/v2/translate';

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
                                    'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`, 
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