import React from 'react'
import {Form, Grid, Header, Label} from 'semantic-ui-react'
import {CTX} from './Store.js'

const today = new Date();

function validateField (value) {
    value = value.replace(/^\s*/, '');
    if (value === '') {
        return 'Cannot be empty';
    } else {
        return false;
    }
}

function validateEmail(value) {

    let emptyResult = validateField(value);

    if (!emptyResult) {
        value = value.replace(/(.+)@(.+){2,}\.(.+){2,}/, '');
        if (value !== '') {
            return 'Invalid email address';
        } else {
            return false;
        }
    } else {
        return emptyResult
    }
}

export default function CommentEditor () {

    const {postCommentAction} = React.useContext(CTX);

    const [nameValue, changeNameValue] = React.useState('');
    const [emailValue, changeEmailValue] = React.useState('');
    const [msgValue, changeMsgValue] = React.useState('');

    return (
        <Grid.Row textAlign={'left'}>
            <Grid.Column>
                <Header as='h2' textAlign='left'>Leave your Comment</Header>
                <Form
                    onSubmit = {(e) => {
                        e.preventDefault();

                        postCommentAction({
                            username: nameValue,
                            email: emailValue,
                            postdate: today.toDateString(),
                            msg: msgValue
                        });

                        changeNameValue('');
                        changeEmailValue('');
                        changeMsgValue('');
                    }}
                >
                    <Label content={'Your Name'}/>
                    <Form.Input
                        placeholder = {'John Doe'}
                        value = {nameValue}
                        onChange = {e => changeNameValue(e.target.value)}
                        error = {validateField(nameValue)}
                        required
                    />

                    <Label content={'Your Email'}/>
                    <Form.Input
                        placeholder = {'your@email.com'}
                        value = {emailValue}
                        onChange = {e => changeEmailValue(e.target.value)}
                        error = {validateEmail(emailValue)}
                        required
                    />

                    <Label content={'Your Message'}/>
                    <Form.TextArea
                        placeholder = {'Type a comment over here...'}
                        value = {msgValue}
                        onChange = {e => changeMsgValue(e.target.value)}
                        error = {validateField(msgValue)}
                        required
                    />

                    <Form.Button
                        type={'submit'}
                        content={'Post comment'}
                        disabled={validateField(nameValue) || validateEmail(emailValue) || validateField(msgValue)}
                    />
                </Form>
            </Grid.Column>
        </Grid.Row>
    )
}