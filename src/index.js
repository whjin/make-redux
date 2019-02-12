const appState = {
    title: {
        text: 'React.js title',
        color: 'red'
    },
    content: {
        text: 'React.js content',
        color: 'blue'
    }
};

const newAppState = {
    ...appState,
    title: {
        ...appState,
        text: 'React.js'
    }
};
const newAppState1 = {
    ...newAppState,
    title: {
        ...newAppState.title,
        color: 'blue'
    }
};

function stateChanger(state, action) {
    if(!state){
        return {
            title: {
                text: 'React.js title',
                color: 'red'
            },
            content: {
                text: 'React.js content',
                color: 'blue'
            }
        }
    }
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            return {
                ...state,
                title: {
                    ...state.title,
                    text: action.text
                }
            };
        case 'UPDATE_TITLE_COLOR':
            return {
                ...state,
                title: {
                    ...state.title,
                    color: action.color
                }
            };
        default:
            return state;
    }
}

function renderApp(appState) {
    renderTitle(appState.title);
    renderContent(appState.content)
}

function renderTitle(title) {
    const titleDOM = document.getElementById('title');
    titleDOM.innerHTML = title.text;
    titleDOM.style.color = title.color
}

function renderContent(content) {
    const contentDOM = document.getElementById('content');
    contentDOM.innerHTML = content.text;
    contentDOM.style.color = content.color
}

function createStore(state, stateChanger) {
    const listeners = [];
    const subscribe = (listener) => listeners.push(listener);
    const getState = () => state;
    const dispatch = (action) => {
        state = stateChanger(state, action);
        listeners.forEach((listener) => listener())
    };
    return {getState, dispatch, subscribe}
}


const store = createStore(appState, stateChanger);
store.subscribe(() => renderApp(store.getState()));

renderApp(store.getState());
store.dispatch({type: 'UPDATE_TITLE_TEXT', text: 'React.js'});
store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'purple'});
