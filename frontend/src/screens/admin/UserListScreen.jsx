import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';

const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        toast.success('User deleted successfully');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Users</h1>
        </Col>
      </Row>
      { loadingDelete && <Loader /> }
      { isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{ error }</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { users.map((user) => (
              <tr key={ user._id }>
                <td>{ user._id }</td>
                <td>{ user.name }</td>
                <td>{ user.email }</td>
                <td>{ user.isAdmin ? 'Yes' : 'No' }</td>
                <td>
                  <LinkContainer to={ `/admin/user/${user._id}/edit` }>
                    <Button variant="info" className="btn-sm mx-2">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={ () => deleteHandler(user._id) }
                    disabled={ user.isAdmin }
                  >
                    <FaTrash style={ { color: 'white' } } />
                  </Button>
                </td>
              </tr>
            )) }
          </tbody>
        </Table>
      ) }
    </>
  );
};

export default UserListScreen;