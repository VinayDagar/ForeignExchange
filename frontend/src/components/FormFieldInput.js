import React from "react";
import {
    Form,
    Input,
    Select as AntSelect,
} from "antd";
import PropTypes from "prop-types";

const TextField = (props) => {
    return (
        <div className="position-relative ant-form-vertical">
            <Form.Item className="from-field-input" label={props.label}>
                <Input
                    onChange={(e) => props.handleChange(e.target.value)}
                    placeholder={props.placeholder}
                    style={props.style}
                    disabled={props.disabled ? props.disabled : false}
                    allowClear={
                        props.allowClear ? props.allowClear : false
                    }
                    prefix={props.prefix}
                    suffix={props.suffix}
                    {...props.rest}
                />
            </Form.Item>
        </div>
    );
};

const Select = (props) => {
    return (
        <div className="position-relative ant-form-vertical">
            <Form.Item className="from-field-input" label={props.label}>
                <AntSelect
                    style={{ width: "100%" }}
                    {...props.rest}
                    disabled={props.disabled ? props.disabled : false}
                    placeholder={props.placeholder}
                    onChange={props.handleChange}
                >
                    {props.options.map((el) => (
                        <AntSelect.Option
                            disabled={props.disableOptions}
                            key={el.value}
                            value={el.value}
                        >
                            {el.label}
                        </AntSelect.Option>
                    ))}
                </AntSelect>
            </Form.Item>
        </div>
    );
};

const FormFieldInput = (props) => {
    switch (props.inputType) {
        case "select":
            return <Select {...props} />;
        default:
            return <TextField {...props} />;
    }
};

FormFieldInput.defaultProps = {
    inputType: "text",
    inputClass: "form-control",
    required: false,
    disabled: false,
    showLabel: true,
    items: [],
    label: "",
    options: [],
    showNow: false,
};

FormFieldInput.propTypes = {
    inputType: PropTypes.string,
    handleChange: PropTypes.func,
    inputClass: PropTypes.string,
    attribute: PropTypes.string,
    value: PropTypes.any,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    showLabel: PropTypes.bool,
    items: PropTypes.array,
    prefix: PropTypes.object,
    suffix: PropTypes.object,
    style: PropTypes.any,
    options: PropTypes.array,
};

export default FormFieldInput;
