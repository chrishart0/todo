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
import { getUser } from "../graphql/queries";
import {
  createUser as createUserMutation,
  createToDoItem as createToDoItemMutation,
  deleteToDoItem as deleteToDoItemMutation
} from "../graphql/mutations";

const App = ({ signOut, user }) => {
  const [userModel, setUserModel] = useState([]);
  const [toDoItems, setToDoItems] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  // Fetch the user, if there is no user for signed in user then create a new one
  async function fetchUser() {
    console.log("Fetching user")
    const apiData = await API.graphql({ query: getUser, variables: { owner: user.username } });
    if (apiData.data.getUser !== undefined && apiData.data.getUser !== null ) {
      const userFromAPI = apiData.data.getUser;
      console.log("Found user: ", userFromAPI)
      setUserModel(userFromAPI);
      // Pull ToDo items from user
      setToDoItems(userFromAPI.ToDoItems.items)
    } else {
      console.log("Creating user")
      createUser();
    }
  }

  // Create new user with hardcoded friend for testing purposes
  async function createUser() {
    const data = {
      owner: user.username,
      friends: ['test2'],

    };
    await API.graphql({
      query: createUserMutation,
      variables: { input: data },
    });
    fetchUser(); //ToDo: Move to then
  }

  async function createToDoItem(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      name: form.get("name"),
      description: form.get("description"),
    };
    const dataToDo = {
      title: form.get("name"),
      description: form.get("description"),
      userToDoItemsOwner: user.username
    };
    
    await API.graphql(graphqlOperation(createToDoItemMutation, { input: dataToDo }))

    fetchUser();
    event.target.reset();
  }

  async function deleteToDo({ id }) {
    const newToDoItems = toDoItems.filter((toDoItem) => toDoItem.id !== id);
    setToDoItems(newToDoItems);
    await API.graphql({
      query: deleteToDoItemMutation,
      variables: { input: { id } },
    });
    fetchUser();
  }

  return (
    <View className="App">
      <Heading level={1}>{user.username}&apos;s ToDo list</Heading>
      <View as="form" margin="3rem 0" onSubmit={createToDoItem}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="To Do Item Name"
            label="To Do Item Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="To Do Item Description"
            label="To Do Item Description"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create ToDo
          </Button>
        </Flex>
      </View>
      <Heading level={2}>My ToDo Items</Heading>
      <View margin="3rem 0">
        {toDoItems.map((toDoItem) => (
          <Flex
            key={toDoItem.id || toDoItem.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {toDoItem.name}
            </Text>
            <Text as="span">{toDoItem.description}</Text>
            <Button variation="link" onClick={() => deleteToDo(toDoItem)}>
              Delete ToDo
            </Button>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);