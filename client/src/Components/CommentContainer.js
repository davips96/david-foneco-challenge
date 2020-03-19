import React from 'react'
import {Table, Grid, Header} from 'semantic-ui-react'
import {CTX} from './Store.js'

function formatName (comment) {
    return (
        <p>
            {comment.postdate + '\n'}
            By <a href={"mailto:" + comment.email}>{comment.username}</a>
        </p>
    )
}

export default function CommentContainer () {

    const {comments} = React.useContext(CTX);

    return (
        <Grid.Row>
            <Grid.Column>
                <Header as='h1' textAlign='left'>Comments</Header>
                <Table striped>
                    <Table.Body padded="true" size={'large'}>
                        {comments.commentData.map((comment, key) => {
                            if (comment !== undefined) {
                                return (
                                    <Table.Row key={key}>
                                        <Table.Cell
                                            width={3}
                                            style={{whiteSpace: 'pre-wrap'}}
                                        >
                                            {formatName(comment)}
                                        </Table.Cell>
                                        <Table.Cell
                                            width={13}
                                            content={comment.msg}
                                        />
                                    </Table.Row>
                                )
                            } else return false;
                        })}
                    </Table.Body>
                </Table>
            </Grid.Column>
        </Grid.Row>
    )
}
