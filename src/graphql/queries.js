/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($owner: String!) {
    getUser(owner: $owner) {
      owner
      friends
      ToDoItems {
        items {
          id
          title
          description
          createdAt
          updatedAt
          userToDoItemsOwner
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $owner: String
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      owner: $owner
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        owner
        friends
        ToDoItems {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getToDoItem = /* GraphQL */ `
  query GetToDoItem($id: ID!) {
    getToDoItem(id: $id) {
      id
      title
      description
      createdAt
      updatedAt
      userToDoItemsOwner
      owner
    }
  }
`;
export const listToDoItems = /* GraphQL */ `
  query ListToDoItems(
    $filter: ModelToDoItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listToDoItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        createdAt
        updatedAt
        userToDoItemsOwner
        owner
      }
      nextToken
    }
  }
`;
