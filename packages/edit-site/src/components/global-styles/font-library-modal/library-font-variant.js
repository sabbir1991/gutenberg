/**
 * WordPress dependencies
 */
import { useContext } from '@wordpress/element';
import {
	CheckboxControl,
	Flex,
	privateApis as componentsPrivateApis,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { getFontFaceVariantName } from './utils';
import { FontLibraryContext } from './context';
import FontFaceDemo from './font-demo';
import { unlock } from '../../../lock-unlock';

function LibraryFontVariant( { face, font } ) {
	const { isFontActivated, toggleActivateFont } =
		useContext( FontLibraryContext );

	const isIstalled =
		font?.fontFace?.length > 0
			? isFontActivated(
					font.slug,
					face.fontStyle,
					face.fontWeight,
					font.source
			  )
			: isFontActivated( font.slug, null, null, font.source );

	const handleToggleActivation = () => {
		if ( font?.fontFace?.length > 0 ) {
			toggleActivateFont( font, face );
			return;
		}
		toggleActivateFont( font );
	};

	const displayName = font.name + ' ' + getFontFaceVariantName( face );
	const { kebabCase } = unlock( componentsPrivateApis );
	const checkboxId = kebabCase(
		`${ font.slug }-${ getFontFaceVariantName( face ) }`
	);

	return (
		<label
			className="font-library-modal__library-font-variant"
			htmlFor={ checkboxId }
		>
			<Flex justify="space-between" align="center" gap="1rem">
				<FontFaceDemo fontFace={ face } text={ displayName } />
				<CheckboxControl
					checked={ isIstalled }
					onChange={ handleToggleActivation }
					__nextHasNoMarginBottom={ true }
					id={ checkboxId }
					label={ false }
				/>
			</Flex>
		</label>
	);
}

export default LibraryFontVariant;
