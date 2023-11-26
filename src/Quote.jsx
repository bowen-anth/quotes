import React, { useEffect, useState } from 'react';

export default function Quote() {
    const [quoteArr, setQuoteArr] = useState([]);
    const [randomIndex, setRandomIndex] = useState(null);

    useEffect(() => {
        function getQuote() {
            fetch('https://type.fit/api/quotes')
                .then(response => response.json())
                .then(data => {
                    setQuoteArr(data);
                    setRandomIndex(Math.floor(Math.random() * data.length));
                })
                .catch(error => {
                    console.error('Error fetching quotes:', error);
                });
        }

        getQuote();
    }, []);

    // Check if randomIndex is valid before accessing the array
    const randomQuote = randomIndex !== null ? quoteArr[randomIndex] : null;
    // Get the author and remove extra type.fit text
    const authorName = randomQuote && randomQuote.author
                            ? randomQuote.author.split(',').slice(0, 1).join(' ')
                            : '';

    return (
        <div className="container centered">
            {randomQuote && (
                <>
                    <h1>{randomQuote.text}</h1>
                    <h2>- {authorName !== "type.fit" ? authorName : "Dale Carnegie"}</h2>
                </>
            )}
        </div>
    );
}

