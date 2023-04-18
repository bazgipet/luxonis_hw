import express, { Request, Response } from 'express';
import path from 'path'
const {db_showAll, db_saveData, db_showPart, db_showInfo} = require('./db.ts')
const app = express();


app.use(express.static(path.join(__dirname, './client/frontend/build')));

app.get('/estate', function(req: Request, res: Response) {
  res.sendFile(path.join(__dirname, './client/frontend/build', 'index.html'));
});

app.get('/apartments/all', async (req: Request, res: Response) => {
    const apartments = await db_showAll('Apartments')
    res.json(apartments);
  });

app.get('/apartments', async (req: Request, res: Response) => {
  const pageId = req.query.pageId;
  let page:number = 1
  if (typeof pageId === 'string') {
    page = parseInt(pageId, 10) > 0 ? parseInt(pageId, 10) : 1
  }

  const count:number = 20
  const offset:number = (page-1) * count
  const apartments = await db_showPart('Apartments', 20, offset)
  res.json(apartments);
});

app.get('/apartments/info', async (req: Request, res: Response) => {
  const apartments_count = await db_showInfo('Apartments')
  res.json({"count":apartments_count});
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});