// (Перша велика, інші маленькі)
export const formatName = (str) => {
  if (!str) return "";
  const trimmed = String(str).trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
};

const getValue = (item, field) => {
  if (!item) return null;
  return typeof item.get === "function" ? item.get(field) : item[field];
};

export const getDisplayName = (item, type = "common") => {
  if (!item) {
    const fallbacks = {
      member: "учасника",
      leader: "керівника",
      award: "відзнаку",
      banner: "слайд",
      video: "відео",
      photo: "фото альбом",
      social: "соцмережу",
    };
    return formatName(fallbacks[type] || "запис");
  }

  const name = getValue(item, "name");
  const surname = getValue(item, "surname");

  if (name || surname) {
    return `${formatName(name)} ${formatName(surname)}`.trim();
  }

  const title = getValue(item, "title");
  const alt = getValue(item, "alt");
  const label = getValue(item, "label");

  const textValue = title || alt || label;

  if (textValue) {
    return formatName(textValue);
  }

  return getDisplayName(null, type);
};
