import { 
  EmbedBlockFragment,
  ImageBlockFragment,
  PagePartialBlockFragment,
  QuoteBlockFragment,
  TableBlockFragment,
  TextBlockFragment,
  TextImageBlockFragment,
  VideoBlockFragment,
  VideoEmbedBlockFragment,
} from '@lib/types/datocms';

export type AnyBlock =
  | EmbedBlockFragment
  | ImageBlockFragment
  | PagePartialBlockFragment
  | QuoteBlockFragment
  | TableBlockFragment
  | TextBlockFragment
  | TextImageBlockFragment
  | VideoBlockFragment
  | VideoEmbedBlockFragment;
