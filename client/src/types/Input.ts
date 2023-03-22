export default interface Input {
  labelText: string;
  labelFor: string;
  id: string;
  name: string;
  type: string;
  autoComplete?: string;
  isRequired: boolean;
  placeholder: string;
  customClass?: string;
  handleChange?: any;
  value: string;
}
