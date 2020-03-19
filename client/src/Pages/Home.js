import React from 'react'
import {Grid, Segment} from 'semantic-ui-react'
import CommentContainer from '../Components/CommentContainer.js'
import CommentEditor from '../Components/CommentEditor.js'

export default function Home () {
    return (
        <div
            align='middle'
            style={{
                backgroundColor: '#F9F9FA',
                paddingTop: '1%',
                paddingBottom: '1%',
                height: window.innerHeight,
                overflowY: 'auto'
            }}
        >
            <div style={{width: '80%', backgroundColor: 'white'}}>
                <Segment>
                    <Grid padded relaxed >
                        <CommentContainer/>
                        <CommentEditor/>
                    </Grid>
                </Segment>
            </div>
        </div>
    )
}