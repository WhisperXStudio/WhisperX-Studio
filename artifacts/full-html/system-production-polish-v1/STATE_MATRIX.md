# WHISPERX System Production Polish — State Matrix

| Area | Default | Hover / Focus | Loading / Processing | Success | Warning | Error | Blocked / Permission | Empty / No Result | Recovery |
|---|---|---|---|---|---|---|---|---|---|
| Navigation | Included | Included | N/A | Active route | N/A | N/A | N/A | N/A | Route reset |
| Marketplace list | Included | Included | Stable loading layout | Published / validated | Partial item | Invalid catalog | Unsupported item | Search empty state | Reset search |
| Marketplace detail | Included | Included | Preview loading | Validated | Dependency review | Missing file | Install blocked | Related empty state | Back / inspect |
| Import | Included | Included | Parse progress | Accepted source | Duplicate / metadata warning | Malformed JSON | Unsafe file / permission | No source | Retry / replace |
| Library | Included | Included | Local read | Native / local record | Local warning | Corrupt record | Storage unavailable | Empty library | Import / clear |
| Preview | Included | Included | Loading | Responsive preview | Metadata-only warning | Failed preview | Untrusted execution blocked | No item | Select item |
| Export | Included | Included | Package generation | Download ready | Partial scope | Generation failure | Browser download blocked | No selection | Retry / change format |
| Install | Included | Included | File-write progress | Written files | Conflict / rename | Write failure | Permission denied | No file plan | Retry / rollback manifest |
| Studio | Included | Included | Dashboard loading | Connected capability | Conditional release | Validation failure | Unsupported capability | Zero-data modules | Open source module |
| Design Intelligence | Included | Included | Recommendation generation | Inspectable result | Limited match | Invalid input | External AI claim blocked | No brief | Edit / regenerate |

## Data resilience cases

Covered by the design contract:

- zero, one and many records;
- long names and descriptions;
- missing optional metadata;
- failed image or preview;
- duplicate import;
- incompatible dependency;
- target-file conflict;
- oversized source;
- malformed JSON;
- unavailable URL;
- slow or interrupted operation.

## Preference and environment cases

- light mode;
- dark mode;
- reduced motion;
- keyboard-only interaction;
- visible focus;
- desktop, tablet and mobile layouts;
- English, Thai and mixed-content wrapping;
- optional browser API unavailable.