/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Button, Layout } from 'antd';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';

const Containers = () => {
    const { Content } = Layout;
    let match = useRouteMatch();
    return (
        <Content>
            <h1>Pojemniki</h1>
            <Switch>
                <Route path={`${match.path}/:containerId`}>formularz</Route>
                <Route path={match.path}>
                    <Button>
                        <Link to={`${match.url}/add`}>Dodaj</Link>
                    </Button>
                </Route>
            </Switch>
        </Content>
    );
};

export { Containers };
