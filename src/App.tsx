import { useState } from "react";
import { InputGroup, FormControl, Button, ListGroup } from "react-bootstrap";

interface QueryResult {
  articleName: string;
  authorName: string;
  abstract: string;
}

function SearchEngine() {
  const [query, setQuery] = useState("");
  const [fetched, setFetched] = useState(false);
  const [results, setResults] = useState<QueryResult[]>([]);

  const handleSearch = async () => {
    setFetched(true);
    const response = await fetch("/search", {
      method: "POST",
      body: JSON.stringify({ query }),
    });
    const data: QueryResult[] = await response.json();
    setResults(data);
  };

  return (
    <div
      className={`d-flex flex-column align-items-center vh-100 vw-100 mx-auto d-block ${
        fetched ? "mt-5" : "justify-content-center"
      }`}
    >
      {!fetched && <h1>Search</h1>}
      <div className="w-40">
        <InputGroup className="my-3">
          <FormControl
            placeholder="Enter your search query"
            size="lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </InputGroup>
      </div>
      {fetched && results.length > 0 && (
        <div className="w-50 mt-4">
          <ListGroup>
            {results.map((result, index) => (
              <ListGroup.Item key={index} className="py-3 my-3">
                <h2 className="text-primary">{result.articleName}</h2>
                <h5 className="text-success">{result.authorName}</h5>
                <span>{result.abstract}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </div>
  );
}

export default SearchEngine;
