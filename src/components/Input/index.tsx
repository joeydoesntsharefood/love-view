import { FC } from 'react';

interface Props {
  name: string;
  placeholder: string;
  type: string;
  value: Record<string, any>;
  label: string;
  onChange(value: Record<string, any>): void;
}

const Input: FC<Props> = ({
  value,
  onChange,
  label,
  name,
  placeholder,
  type,
}) => (
  <div className='custom-input'>
    <label className='custom-input__label'>
      {label}
    </label>

    <input
      className='custom-input__input'
      onChange={e => onChange({ [name]: e.target.value })}
      value={value?.[name] ?? ''}
      placeholder={placeholder}
      type={type}
    />
  </div>
);
 
export default Input;