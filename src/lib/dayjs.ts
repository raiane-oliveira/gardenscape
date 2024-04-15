import dayjs from "dayjs"

import "dayjs/locale/en"
import localizedFormat from "dayjs/plugin/localizedFormat"

dayjs.locale("en")
dayjs.extend(localizedFormat)
