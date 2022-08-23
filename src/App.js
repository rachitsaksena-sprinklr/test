import * as React from "react";
import { client } from "./client";
import { gql, useQuery, ApolloProvider } from "@apollo/client";

const query = gql`
  query Query($page: Int, $searchKeyword: String) {
    characters(page: $page, filter: { name: $searchKeyword }) {
      info {
        next
        prev
      }
      results {
        id
        name
        status
        species
        gender
      }
    }
  }
`;

function App2() {
  const [content, setContent] = React.useState([[]]);
  const [page, setPage] = React.useState(1);
  const { loading } = useQuery(query, {
    variables: {
      page,
    },
    onCompleted: (data) => {
      const newContent = data.characters.results.map((character) => [
        Number(character.id),
        character.name,
        character.status,
        character.species,
        character.gender,
      ]);
      setContent(newContent);
    },
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {content.map((element, index) => (
        <p key={element[0]}>{element[0]}</p>
      ))}
      <button onClick={() => setPage(page - 1)}>prev</button>
      <button onClick={() => setPage(page + 1)}>next</button>
    </>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <App2 />
    </ApolloProvider>
  );
}

export default App;
