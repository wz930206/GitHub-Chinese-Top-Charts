import { useStaticQuery, graphql } from 'gatsby';
import { uniqAndSort } from '../common/utils';

const useAllCollections = () => {
  const { allCollectionJson } = useStaticQuery(
    graphql`
      query AllCollections {
        allCollectionJson {
          nodes {
            id
            Repository
            Address
            Description
            Stars
            Language
            Updated
          }
        }
      }
    `
  );

  const collections = allCollectionJson.nodes;
  const { Language } = collections.reduce(
    (prev, next) => {
      return {
        Language: [...prev.Language, next.Language.trim()],
      };
    },
    { Language: [] }
  );

  const Languages = uniqAndSort(Language);

  return {
    collections,
    Languages,
  };
};

export { useAllCollections };
