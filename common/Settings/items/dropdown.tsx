import { Components, Hooks } from "@api";
import ErrorBoundary from "@common/ErrorBoundary";
import React from "react";

import Settings from "../store";
import type { SettingsItemForType } from "../types";

const { DropdownInput, SettingItem } = Components;

export function DropdownItem(props: SettingsItemForType<"dropdown">) {
    const value = Hooks.useStateFromStores([Settings], () => Settings.get(props.id, props.value));

    return (
        <ErrorBoundary id={props.id}>
            <SettingItem {...props}>
                <DropdownInput
                    value={value}
                    options={props.options}
                    disabled={props.disabled}
                    onChange={v => Settings.set(props.id, v)}
                />
            </SettingItem>
        </ErrorBoundary>
    );
}
