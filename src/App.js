import React, { Component } from 'react'
import extend from 'lodash/extend'
import { SearchkitManager,SearchkitProvider,
  SearchBox, RefinementListFilter, Pagination,
  HierarchicalMenuFilter, HitsStats, SortingSelector, NoHits,
  ResetFilters, RangeFilter, NumericRefinementListFilter,
  ViewSwitcherHits, ViewSwitcherToggle, DynamicRangeFilter,
  InputFilter, GroupedSelectedFilters,
  Layout, TopBar, LayoutBody, LayoutResults,
  ActionBar, ActionBarRow, SideBar, Hits, NoHitsDisplay, NoHitsErrorDisplay } from 'searchkit'
import './index.css'

const host = "https://search-testdomain-gbfr2oplvihlyhdup6ljxsxsqa.ap-southeast-1.es.amazonaws.com/"
const searchkit = new SearchkitManager(host)

const MovieHitsGridItem = (props)=> {
  const {bemBlocks, result} = props
  let url = "http://www.imdb.com/title/" + result._source.imdbId
  const source = extend({}, result._source, result.highlight)
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <a href={url} target="_blank">
        <img data-qa="poster" alt="presentation" className={bemBlocks.item("poster")} src={result._source.poster} width="170" height="240"/>
        <div data-qa="title" className={bemBlocks.item("title")} dangerouslySetInnerHTML={{__html:source.title}}></div>
      </a>
    </div>
  )
}

const HitsListItem = (props)=> {
  const {bemBlocks, result} = props
  const source = extend({}, result._source, result.highlight)
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <div className={bemBlocks.item("details")}>
        <h2 className={bemBlocks.item("product.productFamily")} dangerouslySetInnerHTML={{__html:source.product.attributes.instanceType}}></h2>
        <h3 className={bemBlocks.item("_index")}>Family {source.product.attributes.instanceType}, rated {source.product.attributes.instanceType}/10</h3>
      </div>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout>
          <TopBar>
            <div className="my-logo">Ask Jeeves</div>
            <SearchBox autofocus={true} searchOnChange={true} 
                    queryOptions={{analyzer:"standard"}}
                    queryFields={["product.productFamily","product.attributes.vcpu","product.attributes.memory","product.attributes.location","product.attributes.tenancy","product.attributes.operatingSystem","product.attributes.instanceType"]}/>
            />
          </TopBar>

          <LayoutBody>
            <SideBar>
              <HierarchicalMenuFilter fields={["_type"]} title="AWS Services" id="categories"/>
            </SideBar>
            <LayoutResults>
               <Pagination showNumbers={true}/>
              <ViewSwitcherHits
                hitsPerPage={12} highlightFields={["product.attributes.instanceType","product.attributes.vcpu"]}
                sourceFilter={["product.productFamily", "product.attributes", "product.attributes.vcpu","product.attributes.memory","product.attributes.location","product.attributes.tenancy","product.attributes.operatingSystem","product.attributes.instanceType"]}
                hitComponents={[
                  {key:"list", title:"List", itemComponent:HitsListItem}
                ]}
                scrollTo="body"
            />
             <Pagination showNumbers={true}/>
            </LayoutResults>
          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    );
  }
}

export default App;
