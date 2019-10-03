import Terminal from 'react-bash';
import React from "react";

export const clear = {
    exec: ({ structure, history, cwd }, command) => {
        return { structure, cwd, history: [] };
    },
};

const extensions = { clear };
const Term = () => <Terminal extensions={extensions} />
export default Term