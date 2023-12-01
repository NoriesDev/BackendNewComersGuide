const baseURL = 'https://api-free.deepl.com/v2/translate';
const allLang= 'https://api-free.deepl.com/v2/languages?type=target';
const document= 'https://api-free.deepl.com/v2/document';
import { readFile, writeFile } from "node:fs/promises"
import { Buffer } from 'node:buffer';

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

    const allLanguages = async (req, res, next) => {
        try {
            const response= await fetch(allLang,
                {headers: {
                            'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`, 
                }
            } );
            // console.log(response)
            const data = await response.json()
            // console.log(data)
            return res.status(200).json(data);
          } catch (error) {
                console.error('Error translating text:', error);
                throw error;
          }
        };

        // file: {
        //     fieldname: 'translateDocument',
        //     originalname: 'test.txt',
        //     encoding: '7bit',
        //     mimetype: 'text/plain',
        //     destination: './uploads',
        //     filename: 'translateDocument-1701197609145.txt',
        //     path: 'uploads\\translateDocument-1701197609145.txt',
        //     size: 142
        //   },

const translateDocument = async (req, res, next) => {
  // console.log('hi');            
  // console.log(req);
  // res.send('superdone');
  // return;
  try {
    const formData = new FormData();
    
    const fileData = await readFile(`./uploads/${req.file.filename}`)
    const docToTranslate = new Blob([fileData], {type: req.file.mimetype});

    formData.set("file", docToTranslate, req.file.filename)
    formData.append("target_lang", "DE")

    const sendDocument = await fetch(document, {
      body: formData,
      method: "POST",
      headers: {
        'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`, 
      }, 
    });

    const {document_id, document_key} = await sendDocument.json()

    console.log('document id and key', document_id, document_key)


    const statusPing = setInterval(async () => {
      const checkDocStatus = await fetch(`${document}/${document_id}`, {
        body: JSON.stringify({"document_key": document_key}),
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`, 
        }, 
      });
  
      const data = await checkDocStatus.json()

      if (data.status === 'done') {
        const downloadDoc = await fetch(`${document}/${document_id}/result`, {
          body: JSON.stringify({"document_key": document_key}),
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`, 
          }, 
        });
  
        const contentType = downloadDoc.headers.get("content-type")
  
        if (contentType === 'text/plain') {
          clearInterval(statusPing)
          const translatedDoc = await downloadDoc.text();
          console.log("AFTER RETURN - DEEPL RESPONSE BODY: ", downloadDoc.body)
          console.log(translatedDoc)
          return res.status(201).json({translation: translatedDoc})
           
        }

        console.log("AFTER RETURN - URL LIST: ", downloadDoc.urlList)
        console.log("AFTER RETURN - DEEPL RESPONSE BODY: ", downloadDoc.body)
        res.status(201).json({message: "translated document successfully"})
          return clearInterval(statusPing)
  
        // if (contentType.startsWith('application/json')) {
        //   const translatedDoc = await downloadDoc.json();
        //   console.log(translatedDoc)
        //   return res.status(201).json(translatedDoc)
        // }
  
        throw new Error('Content type is ' + contentType + ', need to setup another conditional')
      }
    }, 3000)
    
  } catch (error) {
    console.error('Error translating text:', error);
    return res.status(500).json({ error: error.message })
  }
};
        

export { translateText, allLanguages, translateDocument };