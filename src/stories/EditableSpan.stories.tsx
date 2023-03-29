import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../components/EditableSpan/EditableSpan";

export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    args: {
        onChange: action('Span value was change'),
        value: 'span value'
    }
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
