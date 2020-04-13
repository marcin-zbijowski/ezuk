import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Container } from './models/container';
import { getCollection, saveDoc } from './utils/db-tools';

if (!admin.apps.length) {
    admin.initializeApp(functions.config().firebase);
}

//initialize express server
const app = express();
const main = express();

//add the path to receive request and set json as bodyParser to process the body
main.use('/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

app.post('/containers', async (req, res) => {
    try {
        const result = await saveDoc('containers', {
            symbol: req.body['symbol'],
            name: req.body['name'],
            capacity: req.body['capacity'],
            refId: req.body['refId']
        });
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/containers', async (_, res) => {
    try {
        const containers: Array<Container> = await getCollection('containers');
        res.status(200).json(containers);
    } catch (error) {
        res.status(500).send(error);
    }
});

//define google cloud function name
export const api = functions.https.onRequest(main);
