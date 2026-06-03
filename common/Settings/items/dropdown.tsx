import { Components, Hooks, Webpack } from "@api";
import ErrorBoundary from "@common/ErrorBoundary";
import { Select as SelectType, SelectOption } from "@vencord/discord-types";
import React from "react";

import Settings from "../store";
import type { SettingsItemForType } from "../types";

const { SettingItem } = Components;
let Select: SelectType | undefined;

function getSelect() {
    Select ??= Webpack.getByStrings('selectionMode:"single",onSelectionChange:', "isSelected:", {
        searchExports: true
    });

    return Select;
}

export function DropdownItem(props: SettingsItemForType<"dropdown">) {
    const value = Hooks.useStateFromStores([Settings], () => Settings.get(props.id, props.value));
    const options = props.options as SelectOption[];
    const SelectComponent = getSelect();

    return (
        <ErrorBoundary id={props.id}>
            <SettingItem {...props}>
                {SelectComponent ? (
                    <SelectComponent
                        closeOnSelect={true}
                        options={options}
                        serialize={v => String(v)}
                        select={v => Settings.set(props.id, v)}
                        isSelected={v => value === v}
                    />
                ) : null}
            </SettingItem>
        </ErrorBoundary>
    );
}
