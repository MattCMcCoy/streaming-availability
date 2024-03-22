import { type InferPagePropsType } from 'next-typesafe-url';
import { withParamValidation } from 'next-typesafe-url/app/hoc';

import { Nav } from '../(nav)/navbar';
import { Route, type RouteType } from './routeType';
import { SearchBar } from './search-bar';
import { SearchResults } from './search-results';

type PageProps = InferPagePropsType<RouteType>;

async function Page({ searchParams }: PageProps) {
  return (
    <div>
      <Nav />
      <div className="mx-auto w-fit">
        <SearchBar />
      </div>
      <SearchResults title={searchParams.title ?? ''} />
    </div>
  );
}

export default withParamValidation(Page, Route);
