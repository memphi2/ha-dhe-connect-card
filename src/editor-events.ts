type SelectorValueDetail = {
  value?: unknown;
};

export function checkedFromEvent(event: Event): boolean {
  const targetChecked = checkedValue(event.target);
  if (targetChecked !== undefined) {
    return targetChecked;
  }
  const currentTargetChecked = checkedValue(event.currentTarget);
  if (currentTargetChecked !== undefined) {
    return currentTargetChecked;
  }
  return false;
}

export function inputStringFromEvent(event: Event): string {
  const targetValue = stringValue(event.target);
  if (typeof targetValue === "string") {
    return targetValue;
  }
  const currentTargetValue = stringValue(event.currentTarget);
  return typeof currentTargetValue === "string" ? currentTargetValue : "";
}

export function textValueFromEvent(event: Event): string {
  const detail = (event as CustomEvent<SelectorValueDetail>).detail;
  if (typeof detail?.value === "string") {
    return detail.value;
  }
  return inputStringFromEvent(event);
}

export function pickerValueFromEvent(event: Event): string | undefined {
  const detail = (event as CustomEvent<SelectorValueDetail>).detail;
  const detailValue = detail?.value;
  if (typeof detailValue === "string") {
    return detailValue || undefined;
  }
  const targetValue = stringValue(event.target);
  if (typeof targetValue === "string") {
    return targetValue || undefined;
  }
  const currentTargetValue = stringValue(event.currentTarget);
  return typeof currentTargetValue === "string" ? currentTargetValue || undefined : undefined;
}

export function textInputValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function checkedValue(source: EventTarget | null): boolean | undefined {
  if (!source) {
    return undefined;
  }
  const value = (source as { checked?: unknown }).checked;
  return typeof value === "boolean" ? value : undefined;
}

function stringValue(source: EventTarget | null): string | undefined {
  if (!source) {
    return undefined;
  }
  const value = (source as { value?: unknown }).value;
  return typeof value === "string" ? value : undefined;
}
