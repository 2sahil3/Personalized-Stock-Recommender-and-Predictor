// import React from 'react';
// import { ListGroup,Image } from 'react-bootstrap';

// const News = ({ newsList }) => {
//     const News = JSON.parse(newsList);
//     console.log("NEWS : " + newsList);
//   return (
//     <ListGroup>
//       {News.map((article, index) => (
//         <ListGroup.Item key={index}>
//           <div className="d-flex justify-content-between align-items-center">
//               <div className="d-flex align-items-center">
//                 <Image src={article.urlToImage} alt="News Image" rounded style={{ width: '100px', height: 'auto' }} />
//                 <div className="ms-3">
//                 <a href={article.url} target="_blank" rel="noopener noreferrer">
//                   <h5>{article.title}</h5>
//                   </a>
//                   <p>{article.description}</p>
//                 </div>
//               </div>
//             <div className="text-muted">{`Sentiment Score: ${article.sentiment_score}`}</div>
//           </div>
//         </ListGroup.Item> 
//       ))}
//     </ListGroup>
//   );
// };

// export default News;


import React from 'react';
import { ListGroup, Image } from 'react-bootstrap';

const News = ({ newsList }) => {
  // Parse the JSON string to an array of news articles
  const newsArticles = JSON.parse(newsList);

  // Sort the news articles by sentiment score in descending order
  const sortedNews = newsArticles.sort((a, b) => b.sentiment_score - a.sentiment_score);

  return (
<>
    <div className="mb-4">
        <h2>Top News Articles</h2>
      </div>
    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
      <ListGroup>
        {sortedNews.map((article, index) => (
          <ListGroup.Item key={index}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <Image src={article.urlToImage} alt="News Image" rounded style={{ width: '100px', height: 'auto' }} />
                <div className="ms-3">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <h5>{article.title}</h5>
                  </a>
                  <p>{article.description}</p>
                </div>
              </div>
              <div className="text-muted">{`Sentiment Score: ${article.sentiment_score}`}</div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
    </>
  );
};

export default News;
