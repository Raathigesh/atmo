import * as React from 'react';
import { EditableText } from "@blueprintjs/core";

function HeaderRow() {
    return (
        <tr>
            <td>
                <EditableText />
            </td>
            <td>
                <EditableText />
            </td>
            <td>
                <button type="button" className="pt-button pt-minimal pt-icon-remove">
                    Delete
                </button>
            </td>
        </tr>
    );
}

export default HeaderRow;