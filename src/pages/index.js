import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { API, graphqlOperation } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listNotes, listUsers } from "../graphql/queries";
import {
  createUser as createUserMutation,
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "../graphql/mutations";

const App = ({ signOut, user }) => {
  const [userModel, setUserModel] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchUser();
    console.log("userModel")
    console.log(userModel)
    fetchNotes();
  }, []);

  async function fetchUser() {
    const apiData = await API.graphql({ query: listUsers });
    console.log("apiData: ", apiData)
    if (apiData.data.listUsers.items !== undefined) {
      const userFromAPI = apiData.data.listUsers.items;
      setUserModel(userFromAPI);
    } else {
      console.log("Creating user")
      createUser();
    }
  }

  async function createUser() {
    const data = {
      owner: "test",
      friends: ['test2'],
      // notes: 
      //   {name: "test",
      //   description: "test"}

    };
    await API.graphql({
      query: createUserMutation,
      variables: { input: data },
    });
    fetchUser();
  }

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    setNotes(notesFromAPI);
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      name: form.get("name"),
      description: form.get("description"),
    };
    // await API.graphql({
    //   query: createNoteMutation,
    //   variables: { input: data },
    // });
    await API.graphql(graphqlOperation(createNoteMutation, { input: data }))

    fetchNotes();
    event.target.reset();
  }

  async function deleteNote({ id }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
    fetchNotes();
  }

  return (
    <View className="App">
      <Heading level={1}>{user.username}&apos;s ToDo list</Heading>
      <View as="form" margin="3rem 0" onSubmit={createNote}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Note Name"
            label="Note Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Note Description"
            label="Note Description"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create Note
          </Button>
        </Flex>
      </View>
      <Heading level={2}>My ToDo Items</Heading>
      <View margin="3rem 0">
        {notes.map((note) => (
          <Flex
            key={note.id || note.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {note.name}
            </Text>
            <Text as="span">{note.description}</Text>
            <Button variation="link" onClick={() => deleteNote(note)}>
              Delete note
            </Button>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);