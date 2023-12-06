import type {
	NanoI18nL10nFunctionParams,
	NanoI18nL10nMessages,
} from '../types.js'

export const getL10nFunction =
	<
		TLocale extends string,
		TMessages extends NanoI18nL10nMessages<TMessages>,
		TKey extends keyof TMessages = keyof TMessages,
	>(
		locale: TLocale,
		messages: TMessages,
	) =>
	(
		key: TKey,
		...params: Readonly<NanoI18nL10nFunctionParams<TMessages, TKey>>
	): string => {
		const message = messages[key]

		if (typeof message === 'string') {
			return message
		}

		if (typeof message === 'function') {
			if (
				typeof params === 'undefined' ||
				!Array.isArray(params) ||
				params.length === 0
			) {
				throw new Error(
					`Params for key '${String(
						key,
					)}' in locale '${locale}' unexpectedly not found.`,
				)
			}

			return message(
				...(params as [unknown] as [
					NanoI18nL10nFunctionParams<TMessages, TKey>,
				]),
			)
		}

		throw new Error(
			`Message for key '${String(
				key,
			)}' in locale '${locale}' unexpectedly has type '${typeof message}'.`,
		)
	}