import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { useUpdateUserMutation, useGetUserDetailsQuery } from "../../slices/usersApiSlice"; // Update API slice
import { useEffect, useState } from "react";

const UserEditScreen = () => {
    const { id: userId } = useParams(); // Change productId to userId
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); // New state for email
    const [role, setRole] = useState(''); // New state for role

    const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(userId); // Update query
    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation(); // Update mutation

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email); // Set email
            setRole(user.role); // Set role
        }
    }, [user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedUser = {
            userId,
            name,
            email,
            role
        };

        const result = await updateUser(updatedUser); // Update user
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("User Updated");
            navigate("/admin/userlist"); // Update navigation
        }
        refetch();
    }

    return (
        <>
            <Link to="/admin/userlist" className="btn btn-success my-3">Go Back</Link>
            <FormContainer>
                <h1>Edit User</h1>
                { loadingUpdate && <Loader /> }
                { isLoading ? <Loader /> : error ? <Message variant='danger'>{ error }</Message> : (
                    <Form onSubmit={ submitHandler }>
                        <Form.Group controlId="name" className="my-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" value={ name } onChange={ (e) => setName(e.target.value) } />
                        </Form.Group>
                        <Form.Group controlId="email" className="my-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" value={ email } onChange={ (e) => setEmail(e.target.value) } />
                        </Form.Group>
                        <Form.Group controlId="role" className="my-2">
                            <Form.Label>Role</Form.Label>
                            <Form.Control type="text" placeholder="Enter Role" value={ role } onChange={ (e) => setRole(e.target.value) } />
                        </Form.Group>
                        <Button type="submit" variant="primary" className="my-2">Update</Button>
                    </Form>
                ) }
            </FormContainer>
        </>
    );
}

export default UserEditScreen; // Ensure the export matches the component name